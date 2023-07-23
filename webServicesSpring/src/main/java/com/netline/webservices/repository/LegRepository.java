package com.netline.webservices.repository;

import com.netline.webservices.model.Leg;
import com.netline.webservices.model.SelectableAircraft;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface LegRepository extends JpaRepository<Leg, String> {

    List<Leg> findAll();

}