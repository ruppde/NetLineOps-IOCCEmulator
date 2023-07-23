package com.netline.webservices.service;

import com.netline.webservices.model.Right;
import com.netline.webservices.repository.RightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RightService {

    @Autowired
    private RightRepository rightRepository;

    public List<Right> findAll() {
        return rightRepository.findAllByOrderByIdDesc();
    }

    public Right findById(int id) {
        return rightRepository.findById(id);
    }
}
