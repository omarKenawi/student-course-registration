package com.example.studentcourseregistration.security;

import com.example.studentcourseregistration.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    public User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return ((CustomUserDetails) authentication.getPrincipal()).getUser();
    }
}