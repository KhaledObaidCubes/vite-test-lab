import { mount } from "@vue/test-utils";
import CreateUserForm from "@app/presentation/components/create-user-form/create-user-form.vue";

// Mock router
vi.mock("@root/router", () => ({
  default: {
    push: vi.fn(),
  },
}));

// Mock controller
const mockCreateNewPerson = vi.fn();
vi.mock("@app/domain/classes/create-user-controller", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      user: {
        firstName: "",
        lastName: "",
        age: 0,
        email: "",
        phone: "",
        address: { street: "", city: "", country: "" },
      },
      isBusy: false,
      createNewPerson: mockCreateNewPerson,
    })),
  };
});

describe("CreateUserForm.vue", () => {
  beforeEach(() => {
    mockCreateNewPerson.mockClear();
  });

  it("renders form with title", () => {
    const wrapper = mount(CreateUserForm, {
      props: { formTitle: "Create new USER" },
    });
    //const h1Tag = wrapper.find("#create-user-form-title");
    //expect(h1Tag.text()).toBe("Create new USER");
    expect(wrapper.text()).toContain("Create new USER");
  });

  it("updates form fields via v-model", async () => {
    const wrapper = mount(CreateUserForm, {
      props: { formTitle: "Test Form" },
    });

    const firstNameInput = wrapper.find("#firstName");
    await firstNameInput.setValue("Khaled");

    const lastNameInput = wrapper.find("#lastName");
    await lastNameInput.setValue("Qad");

    expect((firstNameInput.element as HTMLInputElement).value).toBe("Khaled");
    expect((lastNameInput.element as HTMLInputElement).value).toBe("Qad");
  });

  it("calls createNewPerson and navigates on submit", async () => {
    const router = (await import("@root/router")).default;

    const wrapper = mount(CreateUserForm, {
      props: { formTitle: "Submit Test" },
    });

    // Fill inputs
    await wrapper.find("#firstName").setValue("Khaled");
    await wrapper.find("#lastName").setValue("Qad");
    await wrapper.find("#email").setValue("khaled@example.com");
    await wrapper.find("#age").setValue("30");
    await wrapper.find("#phone").setValue("445778663");

    // Click submit
    await wrapper.find("button").trigger("click");

    // Assert controller called
    expect(mockCreateNewPerson).toHaveBeenCalledTimes(1);
    expect(mockCreateNewPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Khaled",
        lastName: "Qad",
        email: "khaled@example.com",
        age: 30,
        phone: "445778663",
      })
    );

    // Assert navigation
    expect(router.push).toHaveBeenCalledWith("/");
  });
});
