package InvesTour.Services;

import InvesTour.Exceptions.SignUpException;
import InvesTour.Models.User;
import InvesTour.dal.UserRepository;
import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UserRepository repository;

    private final StocksService stocksService;

    public User getUserById(Long id) {
        return Json.fromJson("", User.class);
    }

    public void signUp(User user) throws Exception {
        List<User> users = this.repository.getAllUsers();

        boolean isUserAlreadySignedUp = users.stream().anyMatch(currUser -> currUser.getEmail().equals(user.getEmail()));

        if (isUserAlreadySignedUp) {
            throw new SignUpException("already signed up");
        }

        this.repository.addUser(user);
    }

    public ObjectNode login(String email, String password) {
        List<User> allUsers = this.repository.getAllUsers();

        User currentUser = allUsers.stream()
                .filter(user -> user.getEmail().equals(email) &&
                        user.getPassword().equals(password)).collect(Collectors.toList()).get(0);

        ObjectNode user = Json.newObject();
        user.put("firstName", currentUser.getFirstName());
        user.put("lastName", currentUser.getLastName());
        user.put("email", currentUser.getEmail());
        user.put("role", currentUser.getRole());

        return user;
    }

    public void addStockToUser(String userEmail, long stockId) throws Exception {
        if (isRequestValid(userEmail, stockId)) {
            this.repository.addStockToUser(userEmail, stockId);
        } else {
            throw new Exception("Bad info");
        }
    }

    public void deleteStockForUser(String userEmail, long stockId) throws Exception {
        if (isRequestValid(userEmail, stockId) && this.repository.isStockExistForUser(userEmail,stockId)) {
            this.repository.deleteStockFromUser(userEmail, stockId);
        } else {
            throw new Exception("Bad info");
        }
    }

    private boolean isRequestValid(String userEmail, long stockId) {
        return this.stocksService.isStockExist(stockId) && isUserExist(userEmail);
    }

    public boolean isUserExist(String userEmail) {
        return repository.isUserExist(userEmail);
    }

}
