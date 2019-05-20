package com.devoxx.hipster.service.mapper;

import com.devoxx.hipster.domain.User;
import com.devoxx.hipster.service.dto.UserDTO;
import org.mapstruct.Mapper;

/**
 * @author <a href="mailto:sja@devoxx.com">Stephan Janssen</a>
 */
@Mapper(config = QuarkusMappingConfig.class)
public interface UserMapper {

    UserDTO toDto(User user);

    User toEntity(UserDTO userDTO);

    default User fromId(Long id) {
        if (id == null) {
            return null;
        }
        User user = new User();
        user.id = id;
        return user;
    }
}
