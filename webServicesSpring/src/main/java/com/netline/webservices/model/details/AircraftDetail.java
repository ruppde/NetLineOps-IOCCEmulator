package com.netline.webservices.model.details;

import com.netline.webservices.model.details.aircraft.AircraftContact;
import com.netline.webservices.model.details.aircraft.AircraftEquipment;
import com.netline.webservices.model.details.aircraft.AircraftFuel;
import com.netline.webservices.model.details.aircraft.AircraftWeight;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "NTLN_DETAILS_AIRCRAFT")
@Entity
public class AircraftDetail {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @OneToOne(cascade = {CascadeType.ALL})
    private AircraftEquipment acEquipment;

    @OneToOne(cascade = {CascadeType.ALL})
    private AircraftWeight acWeight;

    @OneToOne(cascade = {CascadeType.ALL})
    private AircraftContact acContact;

    @OneToOne(cascade = {CascadeType.ALL})
    private AircraftFuel acFuel;


}