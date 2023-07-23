package com.netline.webservices.model;

import com.netline.webservices.model.details.AircraftDetail;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_AIRCRAFTS")
@Entity
public class SelectableAircraft {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;


    @Column(name="REGISTRATION")
    @Schema(title = "Registration", description = "The aircraft's registration.", example = "EI-DAC")
    private String registration;

    @Column(name="OWNER")
    @Schema(title = "OwnerName", description = "The aircraft's owner.", example = "RYR")
    private String owner;

    @Column(name="OWNERNAME")
    @Schema(title = "OwnerName", description = "The name of the aircraft's owner.", example = "Ryanair")
    private String ownerName;

    @Column(name="SUBTYPE")
    @Schema(title = "Subtype", description = "The aircraft's model expressed as an integer.", example = "6")
    private String subtype;

    @Column(name="SUBTYPENAME")
    @Schema(title = "SubtypeName", description = "Human-readable aircraft's model.", example = "737")
    private String subtypeName;

    @Column(name="STATE")
    @Schema(title = "State", description = "The aircraft's state (physical, logical, overflow).", example = "PHYSICAL")
    private String state;

    @Column(name="SELECTED")
    @Schema(title = "Selected", description = "Whether or not the aircraft should start up with the checkbox selected.", example = "false")
    private boolean selected;

    @OneToOne(cascade = CascadeType.ALL)
    private AircraftDetail aircraftDetails;

}