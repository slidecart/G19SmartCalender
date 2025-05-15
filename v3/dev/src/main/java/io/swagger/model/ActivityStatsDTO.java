package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import org.openapitools.jackson.nullable.JsonNullable;
import io.swagger.configuration.NotUndefined;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ActivityStatsDTO
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")


public class ActivityStatsDTO   {
  @JsonProperty("total")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private Integer total = null;

  @JsonProperty("upcoming")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private Integer upcoming = null;

  @JsonProperty("ongoing")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private Integer ongoing = null;


  public ActivityStatsDTO total(Integer total) { 

    this.total = total;
    return this;
  }

  /**
   * Get total
   * @return total
   **/
  
  @Schema(description = "")
  
  public Integer getTotal() {  
    return total;
  }



  public void setTotal(Integer total) { 
    this.total = total;
  }

  public ActivityStatsDTO upcoming(Integer upcoming) { 

    this.upcoming = upcoming;
    return this;
  }

  /**
   * Get upcoming
   * @return upcoming
   **/
  
  @Schema(description = "")
  
  public Integer getUpcoming() {  
    return upcoming;
  }



  public void setUpcoming(Integer upcoming) { 
    this.upcoming = upcoming;
  }

  public ActivityStatsDTO ongoing(Integer ongoing) { 

    this.ongoing = ongoing;
    return this;
  }

  /**
   * Get ongoing
   * @return ongoing
   **/
  
  @Schema(description = "")
  
  public Integer getOngoing() {  
    return ongoing;
  }



  public void setOngoing(Integer ongoing) { 
    this.ongoing = ongoing;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ActivityStatsDTO activityStatsDTO = (ActivityStatsDTO) o;
    return Objects.equals(this.total, activityStatsDTO.total) &&
        Objects.equals(this.upcoming, activityStatsDTO.upcoming) &&
        Objects.equals(this.ongoing, activityStatsDTO.ongoing);
  }

  @Override
  public int hashCode() {
    return Objects.hash(total, upcoming, ongoing);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ActivityStatsDTO {\n");
    
    sb.append("    total: ").append(toIndentedString(total)).append("\n");
    sb.append("    upcoming: ").append(toIndentedString(upcoming)).append("\n");
    sb.append("    ongoing: ").append(toIndentedString(ongoing)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
