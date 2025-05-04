package com.skillshare.backend.entity;

// Java time package for handling date and time
import java.time.LocalDateTime;  
// Represents date and time without a time-zone, used for fields like createdAt or updatedAt.

// Jakarta Persistence API (JPA) annotations for ORM mapping
import jakarta.persistence.Entity;  
// Specifies that the class is an entity and is mapped to a database table.
import jakarta.persistence.GeneratedValue;  
// Indicates that the value of the annotated field will be generated automatically.
import jakarta.persistence.GenerationType;  
// Specifies the generation strategies for primary keys (e.g., AUTO, IDENTITY).
import jakarta.persistence.Id;  
// Marks the field as a primary key.
import jakarta.persistence.ManyToOne;  
// Defines a many-to-one relationship between entities.
import jakarta.persistence.Table;  
// Specifies the name of the database table to which the entity is mapped.

// Lombok annotation to reduce boilerplate code
import lombok.Data;  
// Generates getters, setters, toString(), equals(), hashCode(), and other utility methods.


@Data
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private LocalDateTime createdAt;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;
}

