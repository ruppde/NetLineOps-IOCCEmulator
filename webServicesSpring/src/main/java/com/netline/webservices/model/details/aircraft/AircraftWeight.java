package com.netline.webservices.model.details.aircraft;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_DETAILS_AIRCRAFT_WEIGHT")
@Entity
public class AircraftWeight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="DOW")
    private Long dryOperatingWeight;

    @Column(name="MTOW")
    private Long maxTakeoffWeight;

    @Column(name="CARGOCAPACITY")
    private Long cargoCapacity;

}
