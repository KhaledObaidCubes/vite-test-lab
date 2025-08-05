import { mount } from "@vue/test-utils";
import GenericTree from "./generic-tree.vue";
import * as serviceMocker from "../../domain/classes/service-mocker";

// Mock data
const mockPeople = [
  {
    user: {},
    personalInfo: {},
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    id: "1",
  },
];

// Mock fetchPersons
vi.spyOn(serviceMocker, "fetchPersons").mockResolvedValue(mockPeople);

describe("GenericTree.vue", () => {
  //-------------- replace the intier fetchPerson function and mock data from mockPeople
  it("fetches and displays mocked data", async () => {
    const wrapper = mount(GenericTree, {
      props: {
        nodes: {
          data: { name: "Root" },
          children: [],
          checked: false,
          indeterminate: false,
          addNodeToTarget: vi.fn(),
          removeNode: vi.fn(),
          checkMe: vi.fn(),
          depth: 0,
          indexInParent: 0,
        },
      },
    });

    // Wait for fetchPersons to resolve and DOM to update
    await new Promise((resolve) => setTimeout(resolve, 10));
    await wrapper.vm.$nextTick();

    // Check if people are rendered in <pre>
    expect(wrapper.html()).toContain("John");
    expect(serviceMocker.fetchPersons).toHaveBeenCalled();
  });
});
////////////////////////////////////////////////////////////
describe("GenericTree.vue - reactive people data", () => {
  it("people is empty before mount and updates after fetchPersons resolves", async () => {
    // Mount the component but do NOT await next tick yet
    const wrapper = mount(GenericTree, {
      props: {
        nodes: {
          data: { name: "Root" },
          children: [],
          checked: false,
          indeterminate: false,
          addNodeToTarget: vi.fn(),
          removeNode: vi.fn(),
          checkMe: vi.fn(),
          depth: 0,
          indexInParent: 0,
        },
      },
    });

    // Access people immediately after mount, before fetch completes
    const initialPeople = (wrapper.vm as any).people; // should be empty or initial value
    expect(initialPeople).toEqual([]); // or whatever the initial state is

    // Wait enough time for fetchPersons (with 5s delay) + Vue updates
    await new Promise((resolve) => setTimeout(resolve, 10));
    await wrapper.vm.$nextTick();

    // Now people should be updated with fetched data
    const updatedPeople = (wrapper.vm as any).people;
    expect(Array.isArray(updatedPeople)).toBe(true);
    expect(updatedPeople.length).toBeGreaterThan(0);

    // Optional: console log to see the actual data
    console.log("People after fetch:", updatedPeople);
  });
  /*
  10000 10sec is the timeout for the test block not the vitest testTimeout and it is optional
  so if its removed vitest will consider the testTimeout, note that promise timeout is 6000 and
  it is exceeds testTimeout, how ever it is still within the block's timeout so it will not 
  generate any errors, but removing the blocks timeout will generates an error because in this case
  it will consider the global testTimeout configured in the vitest.config.ts
  */
  it("real live data", async () => {
    const people = await serviceMocker.fetchPersons();

    expect(Array.isArray(people)).toBe(true); // Check it's an array
    expect(people.length).toBeGreaterThan(0); // Check it's not empty
    expect(people[0]).toHaveProperty("firstName"); // Check structure
  });
});
