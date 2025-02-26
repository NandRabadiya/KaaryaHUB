package com.nd.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MessageResponse {
    private String message;

    public void setMessage(String commentDeletedSuccessfully) {
    }

    public String getMessage() {
        return message;
    }
}
