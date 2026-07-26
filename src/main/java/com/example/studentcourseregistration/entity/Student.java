package com.example.studentcourseregistration.entity;

import com.example.studentcourseregistration.enums.AcademicLevel;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "students",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_student_user",
                        columnNames = "user_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true,
            foreignKey = @ForeignKey(name = "fk_student_user")
    )
    private User user;

    @Column(
            name = "student_number",
            nullable = false,
            unique = true
    )
    private String studentNumber;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "academic_level",
            nullable = false
    )
    private AcademicLevel academicLevel;
}