package vn.edu.hcmuaf.fit.shoe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.shoe.entity.Contact;


public interface ContactRepository extends JpaRepository<Contact, Integer> {
}
