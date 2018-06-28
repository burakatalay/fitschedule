import React from 'react';
import {Button, Drawer, FontIcon, Snackbar, TextField, Toolbar} from "react-md";
import {withRouter} from "react-router-dom";
import SearchBar from "./SearchBar";
import DiscoverService from "../services/DiscoverService";
import Page from "./Page";
import UserService from "../services/UserService";
import ScheduleService from "../services/ScheduleService";

const mapStyle = {height: '90vh', width: '100%'};
const buttonStyle = {marginLeft: '4rem', marginTop: '1rem'};

class Discover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toasts: [],
            useGeolocation: false,
            markers: [],
            referenceMarker: null,
            geolocation: null,
            visible: true,
            course: {
                name: ''
            }
        };
        this.dismissToast = this.dismissToast.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.showError = this.showError.bind(this);
        this.useGeolocation = this.useGeolocation.bind(this);
        this.markAutocompleteLocation = this.markAutocompleteLocation.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.addToSchedule = this.addToSchedule.bind(this);
    }

    componentDidMount() {
        const mapCenter = new google.maps.LatLng(48.1351, 11.5820);
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: mapCenter,
            zoom: 13
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
        } else {
            console.log('[DiscoverComponent] Browser does not support geolocation');
            this.addToast("Browser doesn't support location.");
        }
    }

    discover(query) {
        DiscoverService.getCourses(query.course, query.coord.lat, query.coord.lng, query.dist)
            .then((courses) => {
                console.log('[DiscoverComponent] Success getting courses', courses);
                this.clearCourseMarkers();
                this.setState({
                    courseProviders: []
                });
                if (courses.length > 0) {
                    courses.forEach((course) => {
                        this.getCourseProvider(course);
                    });
                } else {
                    this.addToast('No courses found around your location.');
                }

            }).catch((e) => {
            console.error('[DiscoverComponent] Error getting courses', e);
        });
    }

    getCourseProvider(course) {
        DiscoverService.getCourseProvider(course.courseprovider)
            .then((courseProvider) => {
                console.log('[DiscoverComponent] Success getting course provider', courseProvider);
                this.createCourseMarker(course, courseProvider);
            }, (error) => {
                console.log('[DiscoverComponent] Error getting course provider with id', course.courseprovider);
            });
    }

    createCourseMarker(course, courseProvider) {
        const startTime = new Date(course.timeslot.start).getHours() + ':' + new Date(course.timeslot.start).getMinutes();
        const endTime = new Date(course.timeslot.end).getHours() + ':' + new Date(course.timeslot.end).getMinutes();
        const contentString = '<div><h3>' + courseProvider.name + '</h3><h4>' +
            course.instructor + '</h4><p>' + startTime + ' - ' + endTime + '</p></div>';
        console.log('[DiscoverComponent] Content string: ', contentString);
        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        const geolocation = {
            'lng': course.location.coordinates[0],
            'lat': course.location.coordinates[1]
        };
        const marker = new google.maps.Marker({
            position: geolocation,
            map: this.map,
            infowindow: infowindow
        });
        marker.addListener('click', () => {
            this.closeAllInfoWindows();
            infowindow.open(this.map, marker);
            this.setState({visible: true, course: course});
        });
        const markers = this.state.markers;
        markers.push(marker);
        this.setState({
            markers: markers
        });
    }

    closeAllInfoWindows() {
        this.state.markers.forEach((marker) => {
            marker.infowindow.close(this.map, marker);
        });
    }

    clearCourseMarkers() {
        const markers = this.state.markers;
        markers.forEach(marker => {
            marker.setMap(null);
        });
        this.setState({
            markers: []
        });
    }

    showPosition(position) {
        console.log('[DiscoverComponent] Geolocation: lat:', position.coords.latitude, 'long:', position.coords.longitude);
        const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.setState({
            geolocation: geolocation,
            useGeolocation: true
        });
        this.createReferenceMarker(geolocation);
    }

    createReferenceMarker(geolocation) {
        if (this.state.referenceMarker) {
            this.state.referenceMarker.setMap(null);
        }
        this.setState({
            referenceMarker: new google.maps.Marker({
                position: geolocation,
                map: this.map
            })
        });
    }

    showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log('[DiscoverComponent] User denied the request for Geolocation');
                this.addToast("Please enable location permission.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log('[DiscoverComponent] Location information is unavailable');
                this.addToast("Location information is unavailable. Please enter manually.");
                break;
            case error.TIMEOUT:
                console.log('[DiscoverComponent] The request to get user location timed out');
                this.addToast("Please enable location from browser settings.");
                break;
            case error.UNKNOWN_ERROR:
                console.log('[DiscoverComponent] An unknown error occurred');
                this.addToast("Unknown error. Location information is unavailable.");
                break;
        }
    }

    focusGeolocation() {
        if (this.state.geolocation) {
            this.setState({
                center: {
                    lat: this.state.geolocation.latitude,
                    lng: this.state.geolocation.longitude
                },
                zoom: 50
            });
        } else {
            this.addToast("Please enable location permission.");
        }

    }

    handleChangeCourse(value) {
        this.setState({course: value});
    }

    useGeolocation() {
        this.setState({
            useGeolocation: true
        });
        this.createReferenceMarker(this.state.geolocation);
        this.searchBar.clearLocation();
    }

    onAutocomplete(value) {
        console.log('[DiscoverComponent] Retrieving geometry for place_id', value);
        const request = {
            placeId: value,
            fields: ['geometry']
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, this.markAutocompleteLocation);
        this.setState({useGeolocation: false});
    }

    markAutocompleteLocation(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log('[DiscoverComponent] Success retrieving geolocation', 'lat', place.geometry.location.lat(), 'lng:', place.geometry.location.lng());
            // createMarker(place);
            const geolocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            this.setState({
                autoCompleteLocation: geolocation,
                useGeolocation: false
            });
            this.createReferenceMarker(geolocation);
        } else {
            console.log('[DiscoverComponent] Error retrieving geolocation', place);
        }
    }

    searchSubmit(value) {
        if (!value.course) {
            this.addToast("Please enter a course name.");
            return;
        }
        const query = {
            course: value.course,
            dist: value.dist
        };
        if (this.state.useGeolocation && this.state.geolocation) {
            query.coord = this.state.geolocation;
        } else if (!this.state.useGeolocation && this.state.autoCompleteLocation) {
            query.coord = this.state.autoCompleteLocation;
        } else {
            this.addToast('Please enable location or enter it manually.');
            return;
        }

        console.log('[DiscoverComponent] Submitting query', query);
        this.discover(query);
    }

    addToast(text, action) {
        this.setState((state) => {
            const toasts = state.toasts.slice();
            toasts.push({text, action});
            return {toasts};
        });
    }

    dismissToast() {
        const [, ...toasts] = this.state.toasts;
        this.setState({toasts});
    };

    handleVisibility(visible) {
        this.setState({visible: visible});
    };

    closeDrawer() {
        this.setState({ visible: false });
    };

    addToSchedule() {
        if(!UserService.isAuthenticated()) {
            console.log('[DiscoverService] User is not authenticated');
            this.props.history.push('/login');
        } else {
            ScheduleService.addToSchedule(this.state.course._id)
                .then(() => {
                    console.error('[DiscoverService] Success adding course to the schedule');
                    this.addToast('Course has been added to your schedule successfully');
                }, (error) => {
                    console.error('[DiscoverService] Error adding course to the schedule', error);
                    this.addToast('Something went wrong. Please try again later.');
                });
        }
    };

    render() {
        const closeBtn = <Button icon onClick={this.closeDrawer}>{'close'}</Button>;

        return (
            <Page>
                <SearchBar useGeolocation={() => this.useGeolocation()}
                           onAutocomplete={(value) => this.onAutocomplete(value)}
                           onSubmit={(value) => this.searchSubmit(value)}
                           onRef={ref => (this.searchBar = ref)}/>
                <div id="map" style={mapStyle}>
                </div>
                <Drawer
                    type={Drawer.DrawerTypes.TEMPORARY}
                    visible={this.state.visible}
                    autoclose={false}
                    position="left"
                    onVisibilityChange={this.handleVisibility}
                    navItems={[]}
                    header={(
                        <div>
                            <Toolbar
                                actions={closeBtn}
                                title={this.state.course.name}
                                className="md-divider-border md-divider-border--bottom"
                            />
                            <Button id="submit" type="submit" style={buttonStyle} onClick={this.addToSchedule} raised primary>Add to Schedule</Button>
                        </div>
                        )}
                />
                <Snackbar toasts={this.state.toasts} autohide={true} onDismiss={this.dismissToast}/>
            </Page>
        );
    }
}

export default withRouter(Discover);

