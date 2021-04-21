# ActiveCampaign Event Tracking Proxy for GTM
Send ActiveCampaing Event information with GTM via a Google Cloud Functions proxy.

## Description
Send Event Tracking data to ActiveCampaign with Google Tag Manager and a Google Cloud Function. You will need to setup:

1. The Google Cloud Function
2. The GTM Tracking with the ActiveCampaign Event Tracking Template
3. A way to identify the user

## Testing

Use this query string attached to your Cloud Functions URL ?action=trackEvent&eventName=**EVENTNAME**&eventData=**EVENTDATA**&contactId=**CONTACTID**  
Replace EVENTNAME, EVENTDATA and CONTACTID with your dummy data  
(e.g. https://us-central1-cloud-functions-2939.cloudfunctions.net/EventToActiveCampaign?action=trackEvent&eventName=watched&eventData=true&contactId=65473 )
