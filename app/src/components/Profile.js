import React, { Component } from 'react';
import { getUserProfile } from '../apiUtils';
import { Avatar, Tabs } from 'antd';
import DrugstoresList from './DrugstoresPage/DrugstoresList'
import MedicineList from './MedicinePage/MedicineList'
import SoldsList from './SoldsPage/SoldsList'
import ManufacturersList from './ManufacturersList/ManufacturersList'
import { getAvatarColor } from '../helpers/Colors';
import LoadingIndicator  from './LoadingIndicator';
import ServerError from './ServerError';
import NotFound from './NotFound';
import '../styles/Profile.css';

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        };
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
            .then(response => {
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                {
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="username">@{this.state.user.surname}</div>
                                </div>
                            </div>
                            <div className="user-poll-details">
                                <Tabs defaultActiveKey="1"
                                      animated={false}
                                      tabBarStyle={tabBarStyle}
                                      size="large"
                                      className="profile-tabs">
                                    <TabPane tab={`Drugstores`} key="1">
                                        <DrugstoresList username={this.state.user.managerCode}/>
                                    </TabPane>
                                    <TabPane tab={`Solds`}  key="2">
                                        <SoldsList username={this.state.user.managerCode}/>
                                    </TabPane>
                                    <TabPane tab={`Medicine`}  key="3">
                                        <MedicineList username={this.state.user.managerCode}/>
                                    </TabPane>
                                    <TabPane tab={`Manufacturers`}  key="4">
                                        <ManufacturersList username={this.state.user.managerCode}/>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    ): null
                }
            </div>
        );
    }
}

export default Profile;