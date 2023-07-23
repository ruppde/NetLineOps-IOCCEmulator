package com.netline.webservices.utils;

import javax.json.*;
import java.io.PrintWriter;
import java.io.StringWriter;

public class Msg {
    public static JsonArrayBuilder msgArray(String messageKey, String severity) {
        JsonObjectBuilder jObj = Json.createObjectBuilder();
        jObj.add("messageKey", messageKey);
        jObj.add("severity", severity);
        JsonArrayBuilder jArray = Json.createArrayBuilder();
        jArray.add(jObj);
        return jArray;
    }

    public static JsonObjectBuilder stackTraceObj(Exception exception) {
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

    public static String showMsg(boolean bSuccess, JsonArrayBuilder...message) {
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



    public static JsonObjectBuilder rightsResultArray() {
        JsonObjectBuilder jObjMain = Json.createObjectBuilder();

        JsonObjectBuilder aggregatedRights = Json.createObjectBuilder();
        aggregatedRights.add("application", "NetLineOps");
        aggregatedRights.add("name", "ACCESS_WEBCLIENT");
        aggregatedRights.add("active", true);

        JsonObjectBuilder attributo = Json.createObjectBuilder();
        attributo.add("name", "attributo");

        JsonArrayBuilder idAttributes = Json.createArrayBuilder();
        idAttributes.add(attributo);

        JsonObjectBuilder identity = Json.createObjectBuilder();
        identity.add("id", 1);
        identity.add("name", "admin");
        identity.add("type", "sa");
        //identity.add("attributes", idAttributes);

        JsonObjectBuilder role = Json.createObjectBuilder().add("name", "View_TimesSquareApplication");

        JsonArrayBuilder ownRoles = Json.createArrayBuilder();
        ownRoles.add(role);

        JsonArrayBuilder jArray = Json.createArrayBuilder();
        jArray.add(aggregatedRights);
        jObjMain.add("aggregatedRights", jArray);
        jObjMain.add("identity", identity);
        jObjMain.add("ownRoles", ownRoles);
        return jObjMain;
    }

    public static String showRights(boolean bSuccess, JsonArrayBuilder...message) {
        JsonObjectBuilder JobMsg = Json.createObjectBuilder();

        JobMsg.add("success", bSuccess);
        if (message.length > 0) {
            JobMsg.add("messages", message[0]);
        }
        JobMsg.add("result", rightsResultArray());

        String sMsg = JobMsg.build().toString();
        return sMsg;
    }

}