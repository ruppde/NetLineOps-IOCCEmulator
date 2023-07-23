package com.netline.webservices.model.details.aircraft;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_DETAILS_AIRCRAFT_CONTACT")
@Entity
public class AircraftContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="RADIO")
    private String radio;

    @Column(name="ACARS")
    private String acars;

    @Column(name="PHONE")
    private String phone;

    @Column(name="CALLSIGN")
    private String callSign;

}
