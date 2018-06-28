import React from 'react';
import {Button, Drawer, FontIcon, Snackbar, TextField, Toolbar} from "react-md";
import {withRouter} from "react-router-dom";
import SearchBar from "./SearchBar";
import DiscoverService from "../services/DiscoverService";
import Page from "./Page";
import SideDrawer from "./SideDrawer";

const mapStyle = {height: '90vh', width: '100%'};

class Discover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toasts: [],
            dist: null,
            useGeolocation: false,
            markers: [],
            referenceMarker: null,
            autoCompleteLocation: null,
            geolocation: null,
            visible: false,
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
        this.distChange = this.distChange.bind(this);
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
        const contentString = '<div><h4 style="color: darkgray;">' + courseProvider.name + '</h4></div>';
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
        infowindow.open(this.map, marker);
        marker.addListener('click', () => {
            this.closeAllInfoWindows();
            infowindow.open(this.map, marker);
            this.openSideDrawer(this.addCourseProvider(course, courseProvider));
        });
        const markers = this.state.markers;
        markers.push(marker);
        this.setState({
            markers: markers
        });
    }

    addCourseProvider(course, courseProvider) {
        return {
            name: course.name,
            id: course._id,
            courseProvider: courseProvider.name,
            instructor: course.instructor,
            timeslot: course.timeslot
        };
    }

    openSideDrawer(course) {
        this.sideDrawer.openDrawer(course);
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
        this.createReferenceCircle(geolocation);
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

    createReferenceCircle(geolocation) {
        if (this.state.referenceCircle) {
            this.state.referenceCircle.setMap(null);
        }
        this.setState({
            referenceCircle: new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                center: geolocation,
                radius: this.state.dist * 1000
            })
        });
    }

    changeCircleRadius(value) {
        if (this.state.referenceCircle) {
            this.state.referenceCircle.setMap(null);
            this.setState({
                referenceCircle: new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: this.map,
                    center: this.state.referenceCircle.center,
                    radius: value * 1000
                })
            });
        }
    }

    distChange(value) {
        console.log('[DiscoveComponent] Distance changed to', value);
        this.setState({dist: value});
        this.changeCircleRadius(value);
    }

    render() {
        return (
            <Page>
                <SearchBar distChange={(value) => this.distChange(value)}
                           useGeolocation={() => this.useGeolocation()}
                           onAutocomplete={(value) => this.onAutocomplete(value)}
                           onSubmit={(value) => this.searchSubmit(value)}
                           onRef={ref => (this.searchBar = ref)}/>
                <div id="map" style={mapStyle}></div>
                <SideDrawer addToast={(value) => this.addToast(value)}
                            onRef={ref => (this.sideDrawer = ref)}/>
                <Snackbar toasts={this.state.toasts}
                          autohide={true}
                          onDismiss={this.dismissToast}/>
            </Page>
        );
    }
}

export default withRouter(Discover);

