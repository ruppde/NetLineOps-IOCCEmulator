package com.netline.webservices.controller.oss;

import com.netline.webservices.service.oss.LegService;
import com.netline.webservices.utils.Msg;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@RestController
@CrossOrigin(value = "http://127.0.0.1:1841")
@RequestMapping("/oss")
@Slf4j
public class OssController {

    @Autowired
    private LegService legService;

    @GetMapping(value = "/getCurrentTime", produces = "application/json")
    @Operation(summary = "Get current time", description = "Gets the current server time", tags = "OSS")
    public ResponseEntity<String> getCurrentTime() {
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
        df.setTimeZone(tz);
        String nowAsISO = df.format(new Date(System.currentTimeMillis()));
        JsonObjectBuilder jObj = Json.createObjectBuilder();
        jObj.add("currentTime", nowAsISO);
        return new ResponseEntity<>(Msg.showResult(true, jObj), HttpStatus.OK);
    }

    @GetMapping(value = "/findAllCompactParameters", produces = "application/json")
    @Operation(summary = "Find the configuration parameters", description = "Find all the application configuration parameters", tags = "OSS")
    public ResponseEntity<String> findAllCompactParameters() {
        JsonObjectBuilder jParameterList= Json.createObjectBuilder();
        jParameterList.add("COMPACT_MESSAGE_OF_THE_DAY", "")
                .add("LOCAL_DOO", true)
                .add("PAX_DETAIL_SHOW_CHECKED_IN", true)
                .add("HANDLE_ALTERNATE_REGISTRATION", true)
                .add("COMPACT_STATUS_LINE_DISPLAY", true)
                .add("COMPACT_SMART_INFO_DISPLAY", true);
        JsonObjectBuilder jObj = Json.createObjectBuilder();
        jObj.add("parameterList", jParameterList);

        return new ResponseEntity<String>(Msg.showResult(true, jObj), HttpStatus.OK);
    }

    @PostMapping(value = "/findLegs", produces = "application/json")
    @Operation(summary = "Find legs", description = "Find all the legs.", tags = "OSS")
    public ResponseEntity<String> findLegs() {
       return legService.findLegs();
    }

    @PostMapping(value = "/sendGuiLog", consumes = "application/json")
    @Operation(summary = "Find legs", description = "Send the entire GUI log after an error.", tags = "OSS")
    public void doSendGuiLog(@RequestBody String guiLog) {
        log.error(guiLog);
    }

    //TODO
    @GetMapping(value = "/statusLine", produces = "application/json")
    public ResponseEntity<String> statusLine() {
        JsonObjectBuilder jObj = Json.createObjectBuilder();
        jObj.add("statusLine", "On Time Performance");

        return new ResponseEntity<String>(Msg.showResult(true, jObj), HttpStatus.OK);
    }

    @GetMapping(value = "/tooltip", produces = "application/json")
    public ResponseEntity<String> tooltip() {
        JsonObjectBuilder jObj = Json.createObjectBuilder();
        jObj.add("tooltip", "<span><h1>OS357<sup style='text-decoration: none; font-weight: 200; font-size: 0.5em'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;22Jul23</sup></h1></span><hr> <i><h3>Base Information</h3></i>");

        return new ResponseEntity<String>(Msg.showResult(true, jObj), HttpStatus.OK);
    }

}
