import React from 'react';
import {FontIcon, Snackbar, TextField} from "react-md";
import {withRouter} from "react-router-dom";
import SearchBar from "./SearchBar";
import DiscoverService from "../services/DiscoverService";
import Page from "./Page";

const mapStyle = {height: '90vh', width: '100%'};

class Discover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toasts: [],
            useGeolocation: false,
            markers: [],
            referenceMarker: null,
            geolocation: null,
            courseProviders: []
        };
        this.dismissToast = this.dismissToast.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.showError = this.showError.bind(this);
        this.useGeolocation = this.useGeolocation.bind(this);
        this.markAutocompleteLocation = this.markAutocompleteLocation.bind(this);
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
                console.log('[DiscoverComponent] Success getting course providers', courses);
                this.clearCourseMarkers();
                this.setState({
                    courseProviders: []
                });
                if (courses.length > 0) {
                    courses.forEach((course) => {
                        DiscoverService.getCourseProvider(course.courseprovider)
                            .then((courseProvider) => {
                                this.updateCourseProviders([courseProvider]);
                            });
                        const geolocation = {
                            'lng': course.location.coordinates[0],
                            'lat': course.location.coordinates[1]
                        };
                        this.createCourseMarker(geolocation);
                    });
                } else {
                    this.addToast('No courses found around your location.');
                }

            }).catch((e) => {
            console.error('[DiscoverComponent] Error getting course providers', e);
        });
    }

    updateCourseProviders(providers) {
        providers.forEach((provider) => {
            const providers = this.state.courseProviders;
            providers.push(provider);
            this.setState({
                courseProviders: providers
            });
        });
    }

    createCourseMarker(geolocation) {
        const contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
            '<div id="bodyContent">' +
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the ' +
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
            'south west of the nearest large town, Alice Springs; 450&#160;km ' +
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
            'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
            'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
            'Aboriginal people of the area. It has many springs, waterholes, ' +
            'rock caves and ancient paintings. Uluru is listed as a World ' +
            'Heritage Site.</p>' +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
            '(last visited June 22, 2009).</p>' +
            '</div>' +
            '</div>';
        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        const marker = new google.maps.Marker({
            position: geolocation,
            map: this.map,
            infowindow: infowindow
        });
        marker.addListener('click', () => {
            this.closeAllInfoWindows();
            infowindow.open(this.map, marker);
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

    render() {
        return (
            <Page>
                <SearchBar useGeolocation={() => this.useGeolocation()}
                           onAutocomplete={(value) => this.onAutocomplete(value)}
                           onSubmit={(value) => this.searchSubmit(value)}
                           onRef={ref => (this.searchBar = ref)}/>
                <div id="map" style={mapStyle}>
                </div>
                <Snackbar toasts={this.state.toasts} autohide={true} onDismiss={this.dismissToast}/>
            </Page>
        );
    }
}

export default withRouter(Discover);

