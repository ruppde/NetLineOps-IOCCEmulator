package com.netline.webservices.model.details.leg;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_DETAILS_LEG_SCHEDULE")
@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="AIRCRAFTCONFIGURATION")
    private String aircraftConfiguration;

    @Column(name="EMPLOYERCABIN")
    private String employerCabin;

    @Column(name="EMPLOYERCOCKPIT")
    private String employerCockpit;

    @Column(name="AIRCRAFTSUBTYPE")
    private String aircraftSubtype;

    @Column(name="LDOOFFSET")
    private String ldoOffset;

    @Column(name="AIRCRAFTOWNER")
    private String aircraftOwner;

    @Column(name="ARRIVALAIRPORT")
    private String arrivalAirport;

    @Column(name="DEPARTUREAIRPORT")
    private String departureAirport;

    @Column(name="ARRIVAL")
    private String arrival;

    @Column(name="DEPARTURE")
    private String departure;

    @OneToOne(cascade = {CascadeType.ALL})
    private RotationIdentifier rotationIdentifier;
}
