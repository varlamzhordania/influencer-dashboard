import { useMutation } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";

const { TimePicker } = DatePicker;

const Schedule = () => {
  const router = useRouter();
  const { code } = router.query;

  const mutation = useMutation(
    ["user-events"],
    async (data) => {
      return await axios.post("/api/google/schedule_event", {
        event: data,
        code,
      });
    },
    {
      onSuccess: (res) => {
        message.success("Meeting is scheduled!");
        router.push(`/schedule/success?event=${res?.data?.eventLink}`);
      },
      onError: () => {
        message.error("Something went wrong, try again later!");
      },
    }
  );

  const handleSubmit = (values) => {
    const dateStr = dayjs(values?.date).format("YYYY-MM-DD");
    const startTimeStr = dayjs(values?.startTime).format("HH:mm");
    const endTimeStr = dayjs(values?.endTime).format("HH:mm");

    const startDateTime = dayjs(
      dateStr + " " + startTimeStr,
      "YYYY-MM-DD HH:mm"
    );
    const endDateTime = dayjs(dateStr + " " + endTimeStr, "YYYY-MM-DD HH:mm");
    const data = {
      summary: values?.summary,
      description: values?.description,
      start: startDateTime,
      end: endDateTime,
    };

    mutation.mutate(data);
  };

  return (
    <>
      <Head>
        <title>Schedule meet</title>
      </Head>
      <div className="flex flex-col space-y-4 p-5 w-full">
        <h1 className="text-2xl font-bold">Schedule a meet</h1>
        <div
          className="bg-white rounded-md flex p-5 w-full"
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <Form
            className="flex flex-col w-full"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="summary"
              label="Title"
              rules={[{ required: true, message: "Please enter a title" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker
                className="w-full"
                format={"MMM DD YYYY"}
                placeholder="Select date"
              />
            </Form.Item>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <Form.Item
                name="startTime"
                label="Start time"
                rules={[
                  { required: true, message: "Please select start time" },
                ]}
              >
                <TimePicker
                  className="w-full"
                  format={"hh:mm A"}
                  placeholder="Select start time"
                />
              </Form.Item>
              <Form.Item
                name="endTime"
                label="End time"
                rules={[{ required: true, message: "Please select end time" }]}
              >
                <TimePicker
                  className="w-full"
                  format={"hh:mm A"}
                  placeholder="Select end time"
                />
              </Form.Item>
            </div>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item className="flex w-full items-center justify-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={mutation.isLoading}
                size="large"
                className="bg-purple-600 hover:bg-purple-600"
              >
                Schedule
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Schedule;
