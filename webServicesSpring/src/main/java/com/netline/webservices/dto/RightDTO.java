package com.netline.webservices.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
public class RightDTO {

    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Schema(title = "Application", description = "Application name.", example = "NetLineOps")
    private String application;

    @Schema(title = "Name", description = "Right name.", example = "ACCESS_WEBCLIENT")
    private String name;

    @Schema(title = "Active", description = "Whether or not the right is active.", example = "true")
    private boolean active;

}

