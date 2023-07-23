package com.netline.webservices.controller.aircraft;

import com.netline.webservices.service.aircraft.AircraftService;
import com.netline.webservices.service.aircraft.details.AircraftDetailsService;
import com.netline.webservices.service.oss.NamedSelectionService;
import com.netline.webservices.utils.Msg;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

@RestController
@CrossOrigin(value = "http://127.0.0.1:1841", allowCredentials = "true")
@RequestMapping("/aircraft")
public class NamedSelectionController {

    @Autowired
    private NamedSelectionService namedSelectionService;

    @Autowired
    private AircraftService aircraftService;

    @Autowired
    private AircraftDetailsService aircraftDetailsService;

    @GetMapping(value = "/findSelections", produces = "application/json")
    @Operation(summary = "Find selections", description = "Retrieves the selections and their respective aircrafts.", tags = "Aircraft")
    public ResponseEntity<String> findSelections() {
        JsonObjectBuilder jObj = Json.createObjectBuilder()
                .add("namedSelections", namedSelectionService.namedSelections())
                .add("aircraftList", aircraftService.aircraftList());
        return new ResponseEntity<>(Msg.showResult(true, jObj), HttpStatus.OK);
    }

}
