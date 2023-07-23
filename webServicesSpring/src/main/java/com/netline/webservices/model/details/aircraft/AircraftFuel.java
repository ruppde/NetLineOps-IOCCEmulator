package com.netline.webservices.model.details.aircraft;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_DETAILS_AIRCRAFT_FUEL")
@Entity
public class AircraftFuel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Column(name="FUELCAPACITY")
    private Long fuelCapacity;

    @Column(name="AVERAGEFUELCONSUMPTION")
    private Long averageFuelConsumption;

}
