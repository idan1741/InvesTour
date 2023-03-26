package InvesTour.retrievers;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface Retriever {
    JsonNode retrieveDataByKeywords(List<String> keywords);
}
