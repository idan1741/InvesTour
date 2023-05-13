package InvesTour.Services;

import InvesTour.Exceptions.SignUpException;
import InvesTour.Models.User;
import InvesTour.dal.UserRepository;
import InvesTour.utils.Json;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UserRepository repository;

    private final StocksService stocksService;

    public User getUserById(Long id) {
        return Json.fromJson("", User.class);
    }

    public Map<String, String> signUp(User user) throws Exception {
        List<User> users = this.repository.getAllUsers();

        boolean isUserAlreadySignedUp = users.stream().anyMatch(currUser -> currUser.getEmail().equals(user.getEmail()));

        if (isUserAlreadySignedUp) {
            throw new SignUpException("already signed up");
        }
        this.repository.addUser(user);
        return this.login(user.getEmail(), user.getPassword());
    }

    public Map<String, String> login(String email, String password) {
        List<User> allUsers = this.repository.getAllUsers();

        User currentUser = allUsers.stream()
                .filter(user -> user.getEmail().equals(email) &&
                        user.getPassword().equals(password)).collect(Collectors.toList()).get(0);

        Map<String, String> userMap = Map.of(
                "firstName", currentUser.getFirstName(),
                "lastName", currentUser.getLastName(),
                "email", currentUser.getEmail(),
                "role", currentUser.getRole()
        );

        return userMap;
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
