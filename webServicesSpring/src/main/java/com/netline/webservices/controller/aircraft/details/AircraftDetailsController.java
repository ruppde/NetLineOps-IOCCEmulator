package com.netline.webservices.controller.aircraft.details;

import com.netline.webservices.service.aircraft.details.AircraftDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://127.0.0.1:1841", allowCredentials = "true")
@RequestMapping("/aircraft/details")
public class AircraftDetailsController {

    @Autowired
    private AircraftDetailsService aircraftDetailsService;

    @GetMapping(value = "/{registration}", produces = "application/json")
    @Operation(summary = "Get details", description = "Retrieves the details of the aircraft.", tags = "Aircraft")
    public ResponseEntity<String> getDetails(@PathVariable("registration") String registration) {
        return aircraftDetailsService.getDetails(registration);
    }

}
