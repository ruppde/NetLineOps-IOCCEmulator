package com.netline.webservices.service.oss;

import com.netline.webservices.model.Leg;
import com.netline.webservices.model.SelectableAircraft;
import com.netline.webservices.repository.LegRepository;
import com.netline.webservices.repository.SelectableAircraftRepository;
import com.netline.webservices.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.json.JsonValue;

import java.util.*;

@Service
public class LegService {

    @Autowired
    private SelectableAircraftRepository selectableAircraftRepository;

    @Autowired
    private LegRepository legRepository;

    private JsonArrayBuilder aircraftList() {
        JsonArrayBuilder jArray = Json.createArrayBuilder();
        List<SelectableAircraft> selectableAircraftList = new ArrayList<>();
        selectableAircraftList = selectableAircraftRepository.findAll();
        for (SelectableAircraft selectableAircraft : selectableAircraftList) {
            JsonObjectBuilder jHMObj = Json.createObjectBuilder()
                    .add("urlAircraftDetail", "http://127.0.0.1:8080/NetLine-1.0/aircraft/details/" + selectableAircraft.getRegistration());
            JsonObjectBuilder jAcObj = Json.createObjectBuilder()
                    .add("ac", selectableAircraft.getRegistration().contains("-") ? selectableAircraft.getRegistration().substring(3) : selectableAircraft.getRegistration())
                    .add("registration", selectableAircraft.getRegistration())
                    .add("alternativeRegistration", selectableAircraft.getRegistration())
                    .add("owner", selectableAircraft.getOwner())
                    .add("subtype", selectableAircraft.getSubtype())
                    .add("state", selectableAircraft.getState())
                    .add("isRotational", true)
                    .add("isOwn", true);
            JsonObjectBuilder jLayoutObj = Json.createObjectBuilder()
                    .add("fgColor", selectableAircraft.getState().equals("PHYSICAL") ? "black" : "black")
                    .add("bgColor", selectableAircraft.getState().equals("PHYSICAL") ? "#F9F9D3" : "#FEBDC5"); //"#FCF9D7" : "#FEBDC5");
            JsonObjectBuilder jObj = Json.createObjectBuilder()
                    .add("registration", selectableAircraft.getRegistration())
                    .add("owner", selectableAircraft.getOwner())
                    .add("ownerName", selectableAircraft.getOwnerName())
                    .add("subtype", selectableAircraft.getSubtype())
                    .add("subtypeName", selectableAircraft.getSubtypeName())
                    .add("state", selectableAircraft.getState())
                    .add("selected", selectableAircraft.isSelected())
                    .add("aircraft", jAcObj)
                    .add("hyperMedia", jHMObj)
                    .add("layout", jLayoutObj);
            jArray.add(jObj);
        }
        return jArray;
    }

    private JsonArrayBuilder parameterList() {
        JsonArrayBuilder jArray = Json.createArrayBuilder();
        JsonObjectBuilder jObj = Json.createObjectBuilder()
                .add("com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.ops.gantt.now.line.color", "red")
                .add("com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.HANDLE_ALTERNATE_REGISTRATION", false)
                .add("com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.COMPACT_STATUS_LINE_DISPLAY", true)
                .add("com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.COMPACT_SMART_INFO_DISPLAY", true);

        jArray.add(jObj);

        return jArray;
    }

    private JsonArrayBuilder legList() {
        List<Leg> legList = new ArrayList<>();
        JsonArrayBuilder jArray = Json.createArrayBuilder();
        legList = legRepository.findAll();

        for (Leg leg : legList) {
            JsonArrayBuilder jUserMarkersArray = Json.createArrayBuilder();
            JsonArrayBuilder jSystemMarkersArray = Json.createArrayBuilder();
            JsonArrayBuilder jRemarksArray = Json.createArrayBuilder();


            JsonObjectBuilder jRotation = Json.createObjectBuilder()
                    .add("registration", leg.getLegDetail().getSchedule().getRotationIdentifier().getRegistration());
            JsonObjectBuilder jData = Json.createObjectBuilder()
                    .add("StartDate", leg.getLocalTimes().getDepartureActual())
                    .add("EndDate", leg.getLocalTimes().getArrivalActual());
            JsonObjectBuilder jNatKey= Json.createObjectBuilder()
                    .add("flight", leg.getIdentifier().getFlight())
                    .add("counter", leg.getIdentifier().getCounter())
                    .add("dayOfOrigin", leg.getIdentifier().getDayOfOrigin())
                    .add("depApSched", leg.getIdentifier().getDepApSched());
            JsonObjectBuilder jIdentifier = Json.createObjectBuilder()
                    .add("natKey", jNatKey);
            JsonObjectBuilder jLocalTimes = Json.createObjectBuilder()
                    .add("departureActual", leg.getLocalTimes().getDepartureActual())
                    .add("arrivalActual", leg.getLocalTimes().getArrivalActual())
                    .add("departureSched", leg.getLocalTimes().getDepartureSched())
                    .add("arrivalSched", leg.getLocalTimes().getArrivalSched());
            JsonObjectBuilder jActuals = Json.createObjectBuilder()
                    .add("offblockTime", leg.getLegDetail().getActuals().getOffblockTime())
                    .add("onblockTime", leg.getLegDetail().getActuals().getOnblockTime());
            JsonObjectBuilder jSch = Json.createObjectBuilder()
                    .add("rotationIdentifier", jRotation)
                    .add("departure", leg.getLocalTimes().getDepartureActual())
                    .add("arrival", leg.getLocalTimes().getArrivalActual())
                    .add("departureAirport", leg.getLegDetail().getSchedule().getDepartureAirport())
                    .add("arrivalAirport", leg.getLegDetail().getSchedule().getArrivalAirport())
                    .add("aircraftOwner", leg.getLegDetail().getSchedule().getAircraftOwner())
                    .add("ldoOffset", leg.getLegDetail().getSchedule().getLdoOffset())
                    .add("aircraftSubtype", leg.getLegDetail().getSchedule().getAircraftSubtype())
                    .add("employerCockpit", leg.getLegDetail().getSchedule().getEmployerCockpit())
                    .add("employerCabin", leg.getLegDetail().getSchedule().getEmployerCabin())
                    .add("aircraftConfiguration", leg.getLegDetail().getSchedule().getAircraftConfiguration());
            JsonObjectBuilder jLegDetail = Json.createObjectBuilder()
                    .add("state", leg.getLegDetail().getState())
                    .add("serviceType", leg.getLegDetail().getServiceType())
                    .add("schedule", jSch)
                    .add("actuals", jActuals);
            JsonObjectBuilder jLayoutSch = Json.createObjectBuilder();
            // .add("bgColor", "#FCFDF5")
            //   .add("fgColor", "black");
            JsonObjectBuilder jLayoutActual = Json.createObjectBuilder();
            // .add("bgColor", "#BED7ED")
            //  .add("fgColor", "black");
            JsonObjectBuilder jHM = Json.createObjectBuilder()
                    .add("urlTooltip", "http://127.0.0.1:8080/NetLine-1.0/oss/tooltip")
                    .add("urlLegDetail", "http://127.0.0.1:8080/testB/")
                    .add("urlTooltipLocalAtAirport", "http://127.0.0.1:8080/testC/")
                    .add("urlStatusLine", "http://127.0.0.1:8080/NetLine-1.0/oss/statusLine")
                    .add("urlStatusLineLocalAtAirport", "http://127.0.0.1:8080/testF/");
            JsonObjectBuilder jObj = Json.createObjectBuilder()
                    .add("identifier", jIdentifier)
                    //.add("data", jData)
                    //.add("StartDate", leg.getLocalTimes().getDepartureActual())
                    //.add("EndDate", leg.getLocalTimes().getArrivalActual())
                    .add("localTimes", jLocalTimes)
                    .add("legType", leg.getLegType())
                    .add("eventType", leg.getEventType())
                    .add("legDetail", jLegDetail)
                    .add("layoutSchedule", jLayoutSch)
                    .add("layoutActual", jLayoutActual)
                    .add("userMarkers", jUserMarkersArray)
                    .add("systemMarkers", jSystemMarkersArray)
                    .add("remarks", jRemarksArray)
                    .add("hyperMedia", jHM)
                    .add("callsign", "TEST")
                    .add("depTimeLocalAtAirport", leg.getLocalTimes().getDepartureActual())
                    .add("bestDepTime", leg.getLocalTimes().getDepartureActual())
                    .add("arrTimeLocalAtAirport", leg.getLocalTimes().getArrivalActual())
                    .add("bestArrTime", leg.getLocalTimes().getArrivalActual())
                    .add("problem", "test problem")
                    .add("name", leg.getActualArrivalAirport() + leg.getIdentifier().getFlight())
                    .add("operatingCarrier", leg.getLegDetail().getSchedule().getAircraftOwner())
                    .add("commercialCarrier", leg.getLegDetail().getSchedule().getAircraftOwner())
                    .add("dispatchOffice", leg.getLegDetail().getSchedule().getAircraftOwner())
                    .add("jointOperator", leg.getLegDetail().getSchedule().getAircraftOwner())
                    .add("actualDepartureAirport", leg.getActualDepartureAirport())
                    .add("actualArrivalAirport", leg.getActualArrivalAirport())
                    .add("updateKey", "1");

            jArray.add(jObj);

        }

        return jArray;
    }

    public ResponseEntity<String> findLegs() {
        JsonObjectBuilder jObj = Json.createObjectBuilder()
                .add("aircraftList", aircraftList())
                .add("parameterList", parameterList())
                .add("atcSlotList", JsonValue.EMPTY_JSON_ARRAY)
                .add("legList", legList());
        return new ResponseEntity<>(Msg.showResult(true, jObj), HttpStatus.OK);
    }

}
