package com.netline.webservices.service;

import com.netline.webservices.model.Session;
import com.netline.webservices.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    public Session findSessionByToken(String token) {
        return sessionRepository.findSessionByToken(token);
    }

    public void insert(Session session) {
        sessionRepository.save(session);
    }

}
