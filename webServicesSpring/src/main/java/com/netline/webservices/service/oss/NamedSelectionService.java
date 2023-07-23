package com.netline.webservices.service.oss;

import com.netline.webservices.model.Identity;
import com.netline.webservices.model.NamedSelection;
import com.netline.webservices.model.SelectableAircraft;
import com.netline.webservices.repository.IdentityRepository;
import com.netline.webservices.repository.NamedSelectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.util.ArrayList;
import java.util.List;

@Service
public class NamedSelectionService {

    @Autowired
    private NamedSelectionRepository namedSelectionRepository;

    private List<NamedSelection> findAll() {
        return namedSelectionRepository.findAll();
    }

    public JsonArrayBuilder namedSelections() {
            JsonArrayBuilder jArray = Json.createArrayBuilder();
            List<NamedSelection> selectionList = new ArrayList<>();
            selectionList = this.findAll();
            for (NamedSelection selection : selectionList) {
                JsonArrayBuilder jAircraftSelectionsArray = Json.createArrayBuilder();
                for (SelectableAircraft selectableAircraft : selection.getAircraftSelections()) {
                    JsonObjectBuilder jAircraftIteratorObj = Json.createObjectBuilder();
                    jAircraftIteratorObj
                                        .add("registration", selectableAircraft.getRegistration())
                                        .add("subtype", selectableAircraft.getSubtype())
                                        .add("subtypeName", selectableAircraft.getSubtypeName())
                                        .add("owner", selectableAircraft.getOwner())
                                        .add("ownerName", selectableAircraft.getOwnerName())
                                        .add("state", selectableAircraft.getState());
                    jAircraftSelectionsArray.add(jAircraftIteratorObj);
                }
                JsonObjectBuilder jSelObj = Json.createObjectBuilder()
                        .add("selectionID", selection.getSelectionID())
                        .add("beginDate", selection.getBeginDate().toString())
                        .add("numberOfDays", selection.getNumberOfDays())
                        .add("aircraftSelections", jAircraftSelectionsArray);
                jArray.add(jSelObj);
            }
            return jArray;
    }

}
