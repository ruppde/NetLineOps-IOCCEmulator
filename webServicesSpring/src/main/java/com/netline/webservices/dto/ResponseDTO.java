package com.netline.webservices.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.io.PrintWriter;
import java.io.StringWriter;

public class ResponseDTO extends ResponseEntity<String> {

    public ResponseDTO(String body, MultiValueMap<String, String> headers, HttpStatusCode status) {
        super(body, headers, status);
    }

    private static JsonArrayBuilder msgArray(String messageKey, String severity) {
        JsonObjectBuilder jObj = Json.createObjectBuilder();
        jObj.add("messageKey", messageKey);
        jObj.add("severity", severity);
        JsonArrayBuilder jArray = Json.createArrayBuilder();
        jArray.add(jObj);
        return jArray;
    }

    private static JsonObjectBuilder stackTraceObj(Exception exception) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        exception.printStackTrace(pw);
        String sStackTrace = sw.toString();
        JsonObjectBuilder jObj = Json.createObjectBuilder();
        if (exception.getMessage() != null)
            jObj.add("cause", exception.getMessage());
        jObj.add("stackTrace", sStackTrace);
        return jObj;
    }

    private static String showMsg(boolean bSuccess, JsonArrayBuilder...message) {
        JsonObjectBuilder JobMsg = Json.createObjectBuilder();
        JobMsg.add("success", bSuccess);
        if (message.length > 0) {
            JobMsg.add("messages", message[0]);
        }
        String sMsg = JobMsg.build().toString();
        return sMsg;
    }

    public static String showResult(boolean bSuccess, JsonObjectBuilder result) {
        JsonObjectBuilder JobMsg = Json.createObjectBuilder();
        JobMsg.add("success", bSuccess);
        JobMsg.add("result", result);
        String sMsg = JobMsg.build().toString();
        return sMsg;
    }

    public static String fail(JsonArrayBuilder message, Exception ex) {
        JsonObjectBuilder JobMsg = Json.createObjectBuilder();
        JobMsg.add("success", false);
        JobMsg.add("messages", message);
        JobMsg.add("result", stackTraceObj(ex));
        String sFail = JobMsg.build().toString();
        return sFail;
    }

}
