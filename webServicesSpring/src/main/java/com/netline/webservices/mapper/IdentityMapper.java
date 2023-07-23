package com.netline.webservices.mapper;

import com.netline.webservices.dto.IdentityDTO;
import com.netline.webservices.dto.RightDTO;
import com.netline.webservices.model.Identity;
import com.netline.webservices.model.Right;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface IdentityMapper {
    IdentityMapper INSTANCE = Mappers.getMapper(IdentityMapper.class);

    Identity toIdentity (IdentityDTO identityDTO);
    IdentityDTO toIdentity (Identity identity);

    @Named("aggregatedRights")
    List<RightDTO> map(List<RightDTO> rightDTOs);

    List<IdentityDTO> toList(Iterable<Identity> identities);

}