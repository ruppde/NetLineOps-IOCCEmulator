package com.netline.webservices.service.security;

import com.netline.webservices.model.Identity;
import com.netline.webservices.model.Session;
import com.netline.webservices.service.SessionService;
import com.netline.webservices.repository.IdentityRepository;
import com.netline.webservices.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class AuthenticationService {

    @Autowired
    private IdentityRepository identityRepository;

    @Autowired
    private SessionService sessionService;

    private String sessionToken;

    private Identity findIdentityByUsernameAndPassword(String username, String password) {
        return identityRepository.findIdentityByUsernameAndPassword(username, password);
    }

    private String generateSessionTokenString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 64) {
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;
    }

    public ResponseEntity<String> doAuthenticate(@PathVariable String username, @RequestHeader("password") String password) {
        Identity claimedIdentity = this.findIdentityByUsernameAndPassword(username, password);
        if (claimedIdentity != null) {
            Session session = new Session();
            String token = this.generateSessionTokenString();
            List<Identity> singularIdentityList = new ArrayList<>();
            HttpHeaders headers = new HttpHeaders();
            DateFormat df = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss zzz");
            Date cookieExp = new Date(System.currentTimeMillis());

            singularIdentityList.add(claimedIdentity);
            session.setIdentity(singularIdentityList);
            session.setToken(token);
            sessionService.insert(session);
            cookieExp.setTime (cookieExp.getTime() + (3600 * 6000));
            df.setTimeZone(TimeZone.getTimeZone("GMT"));
            headers.add("Set-Cookie", "IOCC-Cert-zipped=" + token + "; Version=1; Path=/; Expires="+df.format(cookieExp)+"; SameSite=none; Secure=false;");
            return new ResponseEntity<>(Msg.showMsg(true), headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(Msg.showMsg(false, Msg.msgArray("iocc.sec.authentication.failed", "ERROR")), HttpStatus.UNAUTHORIZED);
    }
}
