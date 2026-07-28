package com.example.studentcourseregistration.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "instructors",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_instructor_user",
                        columnNames = "user_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true,
            foreignKey = @ForeignKey(name = "fk_instructor_user")

    )
    private User user;

    @Column(
            name = "employee_number",
            nullable = false,
            unique = true
    )
    private String employeeNumber;
}