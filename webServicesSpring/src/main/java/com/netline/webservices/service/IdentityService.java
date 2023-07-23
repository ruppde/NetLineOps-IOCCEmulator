package com.netline.webservices.service;

import com.netline.webservices.model.Identity;
import com.netline.webservices.repository.IdentityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IdentityService {

    @Autowired
    private IdentityRepository identityRepository;

    public List<Identity> findAll() {
        return identityRepository.findAllByOrderByIdDesc();
    }

    public Identity findById(int id) {
        return identityRepository.findById(id);
    }
}
