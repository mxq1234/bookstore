package com.bookstore.bookstore_backend.repository;

import com.bookstore.bookstore_backend.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserAuthRepository extends JpaRepository<UserAuth, Integer> {
    UserAuth findUserAuthByUserNameAndPassword(String userName, String password);

    UserAuth findUserAuthByUserID(int userID);

    UserAuth findUserAuthByUserName(String userName);
}
