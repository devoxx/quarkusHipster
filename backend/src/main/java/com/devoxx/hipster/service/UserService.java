package com.devoxx.hipster.service;

import com.devoxx.hipster.domain.User;
import com.devoxx.hipster.service.dto.UserDTO;
import com.devoxx.hipster.service.mapper.UserMapper;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

/**
 * @author <a href="mailto:sja@devoxx.com">Stephan Janssen</a>
 */
@ApplicationScoped
public class UserService {

    @Inject
    UserMapper userMapper;

    public UserDTO getUser(Long id) {
        return userMapper.toDto(User.findById(id));
    }
}
