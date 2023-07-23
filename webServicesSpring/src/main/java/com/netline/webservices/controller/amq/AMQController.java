package com.netline.webservices.controller.amq;

import com.netline.webservices.utils.Msg;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.json.JsonValue;

@RestController
@CrossOrigin("http://127.0.0.1:1841")
@Slf4j
@RequestMapping("/")
public class AMQController {

    @PostMapping(value = "/amq")
    public ResponseEntity<String> postAMQ(@RequestHeader(value = "selector", required = false) String selector, @RequestBody String body) {
        if (selector != null && !selector.isEmpty() && !selector.isBlank())
            log.info(selector);

        JsonObjectBuilder result = Json.createObjectBuilder();
        result.add("cause", "Access denied for this resource!");
        result.add("stackTrace", JsonValue.NULL);
        return new ResponseEntity<String>(Msg.showResult(false, result), HttpStatus.OK);
    }

    @GetMapping(value = "/amq")
    public ResponseEntity<String> getAMQ() {
        JsonObjectBuilder result = Json.createObjectBuilder();
        result.add("cause", "Access denied for this resource!");
        result.add("stackTrace", JsonValue.NULL);
        return new ResponseEntity<String>(Msg.showResult(false, result), HttpStatus.OK);
    }
}