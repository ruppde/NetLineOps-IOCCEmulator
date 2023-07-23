package com.netline.webservices.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.netline.webservices.model.Right;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
public class IdentityDTO {

    @Schema(title = "ID", description = "Auto incremental ID.", example = "1")
    private Long id;

    @Schema(title = "Username", description = "The user name.", example = "NETLINE/XXX/XXX")
    private String username;

    @ArraySchema(schema = @Schema(implementation = RightDTO.class))
    private List<RightDTO> aggregatedRights;

}

