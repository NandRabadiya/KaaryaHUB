package com.nd.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetais extends Exception {
	
	private String error;
	private String message;
	private LocalDateTime timestamp;

}
