package com.netline.webservices.service.aircraft.details;

import com.netline.webservices.model.SelectableAircraft;
import com.netline.webservices.model.details.AircraftDetail;
import com.netline.webservices.repository.details.AircraftDetailsRepository;
import com.netline.webservices.service.aircraft.AircraftService;
import com.netline.webservices.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import java.util.Date;

@Service
public class AircraftDetailsService {

    @Autowired
    private AircraftDetailsRepository aircraftDetailsRepository;

    @Autowired
    private AircraftService aircraftService;

    private JsonObjectBuilder acBase(String registration) {
        SelectableAircraft selectableAircraft = aircraftService.findSelectableAircraftByRegistration(registration);

        JsonObjectBuilder jObj = Json.createObjectBuilder()
                .add("registration", selectableAircraft.getRegistration())
                .add("owner", selectableAircraft.getOwner())
                .add("ownerName", selectableAircraft.getOwnerName())
                .add("subtype", selectableAircraft.getSubtype())
                .add("subtypeName", selectableAircraft.getSubtypeName())
                .add("state", selectableAircraft.getState())
                .add("selected", selectableAircraft.isSelected())
                /* Abnormal fields */
                .add("validSince", new Date().toString())
                .add("validUntil", new Date().toString() )
                .add("operator", selectableAircraft.getOwnerName());
        return jObj;
    }

    private JsonObjectBuilder acFuel(String registration) {
        SelectableAircraft selectableAircraft = aircraftService.findSelectableAircraftByRegistration(registration);
        AircraftDetail aircraftDetails = selectableAircraft.getAircraftDetails();
        JsonObjectBuilder jObj = Json.createObjectBuilder()
                .add("fuelCapacity", aircraftDetails.getAcFuel().getFuelCapacity())
                .add("averageFuelConsumption", aircraftDetails.getAcFuel().getAverageFuelConsumption());
        return jObj;
    }

    private JsonObjectBuilder acContact(String registration) {
        SelectableAircraft selectableAircraft = aircraftService.findSelectableAircraftByRegistration(registration);
        AircraftDetail aircraftDetails = selectableAircraft.getAircraftDetails();
        JsonObjectBuilder jObj = Json.createObjectBuilder()
                .add("radio", aircraftDetails.getAcContact().getRadio())
                .add("acars", aircraftDetails.getAcContact().getAcars())
                .add("phone", aircraftDetails.getAcContact().getPhone())
                .add("callSign", aircraftDetails.getAcContact().getCallSign());
        return jObj;
    }

    public ResponseEntity<String> getDetails(String registration) {
        if (aircraftService.findSelectableAircraftByRegistration(registration) != null) {
            JsonObjectBuilder jObj = Json.createObjectBuilder()
                    .add("acBase", acBase(registration))
                    .add("acFuel", acFuel(registration))
                    .add("acContact", acContact(registration));
            return new ResponseEntity<>(Msg.showResult(true, jObj), HttpStatus.OK);
        }
        return new ResponseEntity<>(Msg.showResult(false, null), HttpStatus.OK);
    }
}
