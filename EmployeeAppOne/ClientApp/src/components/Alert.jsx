import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { history } from '../_helpers';

import { alertService, alertType } from '../_services/alertService';
import './Alert.css'

const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({id, fade})
{
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                if (!alert.message) {
                    setAlerts(alerts => {
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

                        filteredAlerts.forEach( x => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                }
                else {
                    setAlerts(alerts => ([...alerts, alert]));
                }

                if (alert.autoClose) {
                    setTimeout(() => removeAlert(alert), 3000);
                }
            });

        const historyUnlisten = history.listen(({pathname}) => {
            if (pathname?.endsWith('/')) return;
    
            alertService.clear(id);
        }, []);

        return () => {
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);

    function removeAlert(alert) {
        if (fade)
        {
            const alertWithFade = {...alert, fade: true};
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x));

            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else 
        {
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    }

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];
                
        const alertTypeClass = {
            [alertType.success]: 'alert alert-success',
            [alertType.error]: 'alert alert-danger',
            [alertType.info]: 'alert alert-info',
            [alertType.warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <div className="container float-above-everything" >
            <div className="m-3">
                {alerts.map((alert, index) =>
                    <div key={index} className={cssClasses(alert)}>
                        <button type="button" className="btn-close" onClick={() => removeAlert(alert)}></button>
                        <span dangerouslySetInnerHTML={{__html: alert.message}}></span>
                    </div>
                )}
            </div>
        </div>
    );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export { Alert };