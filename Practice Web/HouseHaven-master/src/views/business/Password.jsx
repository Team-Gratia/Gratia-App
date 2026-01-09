import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill, RiLockPasswordLine } from "react-icons/ri";

import Button from "../../components/Button";
import styled from "styled-components";

const Text = styled.p`
  color: rgb(17 24 39);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-top: 23px;
`;

const Label = styled.div`
  line-height: 1.5rem;
  color: rgb(75 85 99);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin: 0.8rem 0;
`;

const Group = styled.div`
  margin-bottom: 1rem;
`;

const IconInput = styled.div`
  border: 1px solid rgb(209 213 219);
  display: flex;
  padding: 0.7rem;
  border-radius: 3px;
  width: 400px;
`;

const Input = styled.input`
  border: 0;
  outline: none;
  width: 100%;

  &:focus {
    border: 0;
  }
  &::placeholder {
    font-size: 0.8rem;
  }
`;

const Icon = styled.div`
  margin-right: 7px;
`;

const Password = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Text>Password</Text>

      <Group>
        <Label>Old Password</Label>
        <IconInput>
          <Icon>
            <RiLockPasswordLine color="rgb(75 85 99)" />
          </Icon>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Old password"
            name="oldPassword"
            value={password.oldPassword}
            onChange={handleChange}
          />
          <Icon onClick={togglePasswordVisibility}>
            {showPassword ? (
              <RiEyeOffFill color="rgb(75 85 99)" />
            ) : (
              <RiEyeFill color="rgb(75 85 99)" />
            )}
          </Icon>
        </IconInput>
      </Group>
      <Group>
        <Label>New Password</Label>
        <IconInput>
          <Icon>
            <RiLockPasswordLine color="rgb(75 85 99)" />
          </Icon>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            name="password"
            value={password.password}
            onChange={handleChange}
          />
          <Icon onClick={togglePasswordVisibility}>
            {showPassword ? (
              <RiEyeOffFill color="rgb(75 85 99)" />
            ) : (
              <RiEyeFill color="rgb(75 85 99)" />
            )}
          </Icon>
        </IconInput>
      </Group>
      <Group>
        <Label>Confirm Password</Label>
        <IconInput>
          <Icon>
            <RiLockPasswordLine color="rgb(75 85 99)" />
          </Icon>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            name="confirmPassword"
            value={password.confirmPassword}
            onChange={handleChange}
          />
          <Icon onClick={togglePasswordVisibility}>
            {showPassword ? (
              <RiEyeOffFill color="rgb(75 85 99)" />
            ) : (
              <RiEyeFill color="rgb(75 85 99)" />
            )}
          </Icon>
        </IconInput>
      </Group>

      <Button
        containerStyles={{
          width: "200px",
          padding: "14px 0",
          fontSize: "15px",
        }}
      >
        UPDATE PASSWORD
      </Button>
    </div>
  );
};

export default Password;
