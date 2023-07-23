package com.netline.webservices.model.details.aircraft;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_DETAILS_AIRCRAFT_EQUIPMENT")
@Entity
public class AircraftEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="APRESTRICTION")
    private boolean apRestriction;

    @Column(name="NOISEFACTOR")
    private boolean noiseFactor;

    @Column(name="STANDARDVERSION")
    private String standardVersion;

    @Column(name="VERSIONNAME")
    private String versionName;

    @Column(name="COMPARTMENTS")
    private String compartments;

    @Column(name="COCKPITCREWSIZE")
    private Integer cockpitCrewSize;

    @Column(name="CABINCREWSIZE")
    private Integer cabinCrewSize;

    @Column(name="SPECIALEQUIPMENT")
    private String specialEquipment;

}
