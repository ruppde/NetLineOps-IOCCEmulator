package com.netline.webservices.service.security;

import com.netline.webservices.model.Identity;
import com.netline.webservices.model.Right;
import com.netline.webservices.model.Session;
import com.netline.webservices.repository.IdentityRepository;
import com.netline.webservices.repository.SessionRepository;
import com.netline.webservices.service.SessionService;
import com.netline.webservices.utils.Msg;
import jakarta.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.json.*;

import java.util.List;

@Service
public class AuthorizationService {

    @Autowired
    private IdentityRepository identityRepository;

    @Autowired
    private SessionService sessionService;

    private JsonObjectBuilder rightsResultArray(Identity identity) { //TODO: cleanup
        JsonObjectBuilder jObjMain = Json.createObjectBuilder();
        JsonObjectBuilder jObj = Json.createObjectBuilder();
        JsonArrayBuilder ownRoles = Json.createArrayBuilder();
        JsonArrayBuilder aggregatedRights = Json.createArrayBuilder();
        jObj.add("id", identity.getId());
        jObj.add("name", identity.getUsername());
        jObj.add("type", "sa");
        for (Right r: identity.getAggregatedRights()) {
            JsonObjectBuilder rightObj = Json.createObjectBuilder();
            rightObj.add("application", r.getApplication());
            rightObj.add("name", r.getName());
            rightObj.add("active", r.isActive());
            aggregatedRights.add(rightObj);
        }
        jObjMain.add("aggregatedRights", aggregatedRights);
        jObjMain.add("identity", jObj);
        jObjMain.add("ownRoles", ownRoles);
        return jObjMain;
    }

    private String rightsMessage(Identity identity) {
        JsonObjectBuilder JobMsg = Json.createObjectBuilder();
        JsonObjectBuilder jResult = rightsResultArray(identity);
            JobMsg.add("success", true);
            JobMsg.add("result", jResult);
            String sMsg = JobMsg.build().toString();
            return sMsg;

    }

    public ResponseEntity<String> doAuthorize(String IOCCCertZipped) {
        if (IOCCCertZipped != null && !IOCCCertZipped.isEmpty()) {
            Session session = sessionService.findSessionByToken(IOCCCertZipped);
            if (session != null && session.getIdentity() != null) {
                return new ResponseEntity<String>(this.rightsMessage(session.getIdentity().stream().findFirst().get()), HttpStatus.OK);
            }
        }

        return new ResponseEntity<String>(Msg.showMsg(true, Msg.msgArray("iocc.sec.internal.authentication.not.found", "ERROR")), HttpStatus.UNAUTHORIZED);
    }
}
