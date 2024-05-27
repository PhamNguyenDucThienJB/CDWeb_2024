package vn.edu.hcmuaf.fit.shoe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.shoe.entity.Customer;
import vn.edu.hcmuaf.fit.shoe.entity.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

    List<Order> findAllByCustomer(Customer customer) ;
}
