package io.swagger.api;

import io.swagger.model.ActivityDTO;
import io.swagger.model.CreateActivityRequest;
import org.threeten.bp.LocalDate;
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
public class ActivitiesApiController implements ActivitiesApi {

    private static final Logger log = LoggerFactory.getLogger(ActivitiesApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public ActivitiesApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<ActivityDTO>> activitiesBetweenGet(@NotNull @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema()) @Valid @RequestParam(value = "start", required = true) LocalDate start
,@NotNull @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema()) @Valid @RequestParam(value = "end", required = true) LocalDate end
) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<List<ActivityDTO>>(objectMapper.readValue("[ {\n  \"endDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"title\" : \"title\",\n  \"category\" : \"category\",\n  \"startDate\" : \"2000-01-23T04:56:07.000+00:00\"\n}, {\n  \"endDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"title\" : \"title\",\n  \"category\" : \"category\",\n  \"startDate\" : \"2000-01-23T04:56:07.000+00:00\"\n} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<ActivityDTO>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<ActivityDTO>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<ActivityDTO>> activitiesCategoryCategoryIdGet(@Parameter(in = ParameterIn.PATH, description = "", required=true, schema=@Schema()) @PathVariable("categoryId") Integer categoryId
) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<List<ActivityDTO>>(objectMapper.readValue("[ {\n  \"endDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"title\" : \"title\",\n  \"category\" : \"category\",\n  \"startDate\" : \"2000-01-23T04:56:07.000+00:00\"\n}, {\n  \"endDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"title\" : \"title\",\n  \"category\" : \"category\",\n  \"startDate\" : \"2000-01-23T04:56:07.000+00:00\"\n} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<ActivityDTO>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<ActivityDTO>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<ActivityDTO> activitiesCreatePost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody CreateActivityRequest body
) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<ActivityDTO>(objectMapper.readValue("{\n  \"endDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"title\" : \"title\",\n  \"category\" : \"category\",\n  \"startDate\" : \"2000-01-23T04:56:07.000+00:00\"\n}", ActivityDTO.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<ActivityDTO>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<ActivityDTO>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Void> activitiesDeleteIdDelete(@Parameter(in = ParameterIn.PATH, description = "", required=true, schema=@Schema()) @PathVariable("id") Integer id
) {
        String accept = request.getHeader("Accept");
        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Void> activitiesEditIdPut(@Parameter(in = ParameterIn.PATH, description = "", required=true, schema=@Schema()) @PathVariable("id") Integer id
,@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody CreateActivityRequest body
) {
        String accept = request.getHeader("Accept");
        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<ActivityDTO>> activitiesFutureGet() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<List<ActivityDTO>>(objectMapper.readValue("[ {\n  \"endDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"title\" : \"title\",\n  \"category\" : \"category\",\n  \"startDate\" : \"2000-01-23T04:56:07.000+00:00\"\n}, {\n  \"endDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"title\" : \"title\",\n  \"category\" : \"category\",\n  \"startDate\" : \"2000-01-23T04:56:07.000+00:00\"\n} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<ActivityDTO>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<ActivityDTO>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<List<ActivityDTO>> activitiesOngoingGet() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<List<ActivityDTO>>(objectMapper.readValue("[ {\n  \"endDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"title\" : \"title\",\n  \"category\" : \"category\",\n  \"startDate\" : \"2000-01-23T04:56:07.000+00:00\"\n}, {\n  \"endDate\" : \"2000-01-23T04:56:07.000+00:00\",\n  \"description\" : \"description\",\n  \"id\" : 0,\n  \"title\" : \"title\",\n  \"category\" : \"category\",\n  \"startDate\" : \"2000-01-23T04:56:07.000+00:00\"\n} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<ActivityDTO>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<ActivityDTO>>(HttpStatus.NOT_IMPLEMENTED);
    }

}
