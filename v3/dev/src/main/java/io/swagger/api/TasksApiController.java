package io.swagger.api;

import io.swagger.model.ConvertTaskRequest;
import io.swagger.model.CreateTaskRequest;
import io.swagger.model.TaskDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")
@RestController
public class TasksApiController implements TasksApi {

    private static final Logger log = LoggerFactory.getLogger(TasksApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public TasksApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<TaskDTO>> tasksAllGet() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<List<TaskDTO>>(objectMapper.readValue("[ {\n  \"dueDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"completed\" : true,\n  \"title\" : \"title\",\n  \"category\" : \"category\"\n}, {\n  \"dueDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"completed\" : true,\n  \"title\" : \"title\",\n  \"category\" : \"category\"\n} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<TaskDTO>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<TaskDTO>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<TaskDTO>> tasksCategoryCategoryIdGet(@Parameter(in = ParameterIn.PATH, description = "", required=true, schema=@Schema()) @PathVariable("categoryId") Integer categoryId
) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<List<TaskDTO>>(objectMapper.readValue("[ {\n  \"dueDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"completed\" : true,\n  \"title\" : \"title\",\n  \"category\" : \"category\"\n}, {\n  \"dueDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"completed\" : true,\n  \"title\" : \"title\",\n  \"category\" : \"category\"\n} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<TaskDTO>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<TaskDTO>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<TaskDTO> tasksCreatePost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody CreateTaskRequest body
) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<TaskDTO>(objectMapper.readValue("{\n  \"dueDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"completed\" : true,\n  \"title\" : \"title\",\n  \"category\" : \"category\"\n}", TaskDTO.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<TaskDTO>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<TaskDTO>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Void> tasksDeleteIdDelete(@Parameter(in = ParameterIn.PATH, description = "", required=true, schema=@Schema()) @PathVariable("id") Integer id
) {
        String accept = request.getHeader("Accept");
        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<TaskDTO> tasksEditIdPut(@Parameter(in = ParameterIn.PATH, description = "", required=true, schema=@Schema()) @PathVariable("id") Integer id
,@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody CreateTaskRequest body
) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<TaskDTO>(objectMapper.readValue("{\n  \"dueDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"completed\" : true,\n  \"title\" : \"title\",\n  \"category\" : \"category\"\n}", TaskDTO.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<TaskDTO>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<TaskDTO>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Void> tasksIdCompletePut(@Parameter(in = ParameterIn.PATH, description = "", required=true, schema=@Schema()) @PathVariable("id") Integer id
) {
        String accept = request.getHeader("Accept");
        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Void> tasksIdConvertPost(@Parameter(in = ParameterIn.PATH, description = "", required=true, schema=@Schema()) @PathVariable("id") Integer id
,@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody ConvertTaskRequest body
) {
        String accept = request.getHeader("Accept");
        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<TaskDTO> tasksIdGet(@Parameter(in = ParameterIn.PATH, description = "", required=true, schema=@Schema()) @PathVariable("id") Integer id
) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<TaskDTO>(objectMapper.readValue("{\n  \"dueDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"completed\" : true,\n  \"title\" : \"title\",\n  \"category\" : \"category\"\n}", TaskDTO.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<TaskDTO>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<TaskDTO>(HttpStatus.NOT_IMPLEMENTED);
    }

}
