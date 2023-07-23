package com.netline.webservices.service.aircraft;

import com.netline.webservices.model.SelectableAircraft;
import com.netline.webservices.repository.SelectableAircraftRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Parser;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.roxstudio.utils.CUrl;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.util.ArrayList;
import java.util.List;

@Service
public class AircraftService {

    @Autowired
    private SelectableAircraftRepository selectableAircraftRepository;

    private List<SelectableAircraft> findAll() { return selectableAircraftRepository.findAll(); }

    public SelectableAircraft findSelectableAircraftByRegistration(String registration) { return selectableAircraftRepository.findSelectableAircraftByRegistration(registration); }


    public JsonArrayBuilder aircraftList() {
        JsonArrayBuilder jArray = Json.createArrayBuilder();
        List<SelectableAircraft> selectableAircraftList = new ArrayList<>();
        selectableAircraftList = this.findAll();
        for (SelectableAircraft selectableAircraft : selectableAircraftList) {
            JsonObjectBuilder jAcObj = Json.createObjectBuilder()
                    .add("registration", selectableAircraft.getRegistration())
                    .add("owner", selectableAircraft.getOwner())
                    .add("ownerName", selectableAircraft.getOwnerName())
                    .add("subtype", selectableAircraft.getSubtype())
                    .add("subtypeName", selectableAircraft.getSubtypeName())
                    .add("state", selectableAircraft.getState())
                    .add("selected", selectableAircraft.isSelected());
            jArray.add(jAcObj);
        }
        return jArray;
    }

}
