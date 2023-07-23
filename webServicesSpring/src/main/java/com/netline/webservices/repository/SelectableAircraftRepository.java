package com.netline.webservices.repository;

import com.netline.webservices.model.SelectableAircraft;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface SelectableAircraftRepository extends JpaRepository<SelectableAircraft, String> {

    List<SelectableAircraft> findAll();

    SelectableAircraft findSelectableAircraftByRegistration(String registration);

}
