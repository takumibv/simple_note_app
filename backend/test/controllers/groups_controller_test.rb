require "test_helper"

class GroupsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @group = groups(:one)
    @headers = auth_headers(@user)
  end

  test "should get index" do
    get groups_url, headers: @headers, as: :json
    assert_response :success
  end

  test "should create group" do
    assert_difference("Group.count") do
      post groups_url, params: { group: { name: "New Group" } }, headers: @headers, as: :json
    end

    assert_response :created
  end

  test "should show group" do
    get group_url(@group), headers: @headers, as: :json
    assert_response :success
  end

  test "should update group" do
    patch group_url(@group), params: { group: { name: "Updated" } }, headers: @headers, as: :json
    assert_response :success
  end

  test "should destroy group" do
    assert_difference("Group.count", -1) do
      delete group_url(@group), headers: @headers, as: :json
    end

    assert_response :no_content
  end

  test "should return unauthorized without token" do
    get groups_url, as: :json
    assert_response :unauthorized
  end
end
